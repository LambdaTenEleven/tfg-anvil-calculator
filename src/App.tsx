import { useMemo, useState } from 'react';
import InstructionRow from './components/InstructionRow';
import ResultStrip from './components/ResultStrip';
import {
  emptyInstruction,
  type Instruction,
  type ResolvedActionId,
  type SelectedInstruction,
} from './domain/actions';
import { calculateSetupActions, normalizeInstructions, sortInstructions } from './domain/calculator';

interface CalculationResult {
  setupActions: ResolvedActionId[];
  finalActions: ResolvedActionId[];
}

function isSelectedInstruction(instruction: Instruction): instruction is SelectedInstruction {
  return instruction.action !== '' && instruction.priority !== '';
}

export default function App() {
  const [instructions, setInstructions] = useState<Instruction[]>([
    emptyInstruction(),
    emptyInstruction(),
    emptyInstruction(),
  ]);
  const [targetValue, setTargetValue] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');

  const validInstructions = useMemo(
    () => instructions.filter(isSelectedInstruction),
    [instructions],
  );

  function updateInstruction(index: number, patch: Partial<Instruction>) {
    setInstructions((current) =>
      current.map((instruction, instructionIndex) =>
        instructionIndex === index ? { ...instruction, ...patch } : instruction,
      ),
    );
  }

  function calculate() {
    const parsedTarget = Number.parseInt(targetValue, 10);

    if (!Number.isInteger(parsedTarget) || parsedTarget < 0) {
      setError('Enter a target value of 0 or higher.');
      setResult(null);
      return;
    }

    const finalInstructions = normalizeInstructions(validInstructions, parsedTarget);
    const setupActions = calculateSetupActions(parsedTarget, finalInstructions);

    setError('');
    setResult({
      setupActions,
      finalActions: sortInstructions(finalInstructions).map((instruction) => instruction.action),
    });
  }

  function reset() {
    setInstructions([emptyInstruction(), emptyInstruction(), emptyInstruction()]);
    setTargetValue('');
    setResult(null);
    setError('');
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>TerraFirmaGreg Anvil Calculator</h1>
        </div>
        <button type="button" className="secondary-button" onClick={reset}>
          Reset
        </button>
      </header>

      <div className="layout">
        <section className="panel instructions-panel">
          <div className="section-heading">
            <h2>Smithing Instructions</h2>
            <span>{validInstructions.length}/3 set</span>
          </div>

          <div className="instruction-list">
            {instructions.map((instruction, index) => (
              <InstructionRow
                key={index}
                instruction={instruction}
                index={index}
                onActionChange={(action) => updateInstruction(index, { action })}
                onPriorityChange={(priority) => updateInstruction(index, { priority })}
              />
            ))}
          </div>
        </section>

        <aside className="panel target-panel">
          <h2>Target Value</h2>
          <label className="target-field">
            <input
              type="number"
              min="0"
              value={targetValue}
              onChange={(event) => setTargetValue(event.target.value)}
              placeholder="Example: 72"
            />
          </label>
          {error ? <p className="error-message">{error}</p> : null}
          <button type="button" className="primary-button" onClick={calculate}>
            Calculate
          </button>
        </aside>
      </div>

      <section className="panel results-panel">
        <div className="section-heading">
          <h2>Result</h2>
          {result ? <span>{result.setupActions.length + result.finalActions.length} actions</span> : null}
        </div>

        {result ? (
          <>
            <ResultStrip
              title="1. Setup"
              actions={result.setupActions}
              emptyText="No setup actions needed."
            />
            <ResultStrip
              title="2. Finally"
              actions={result.finalActions}
              emptyText="No final instructions selected."
            />
          </>
        ) : (
          <p className="empty-state">Choose instructions, enter the target, then calculate.</p>
        )}
      </section>
    </main>
  );
}
