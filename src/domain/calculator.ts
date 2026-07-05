import {
  ACTION_VALUES,
  type PickableActionId,
  type ResolvedActionId,
  type ResolvedInstruction,
  type SelectedInstruction,
} from './actions';

function selectBestHit(
  preTargetValue: number,
  remainingHits: ResolvedActionId[],
  targetValue: number,
): ResolvedActionId {
  let bestHitAction = remainingHits[0];
  let minActions = Infinity;

  remainingHits.forEach((hit) => {
    const hitValue = ACTION_VALUES[hit];
    const actionsNeeded = Math.ceil(preTargetValue / hitValue);

    if (
      actionsNeeded < minActions &&
      (preTargetValue % hitValue === 0 || preTargetValue + hitValue <= targetValue)
    ) {
      minActions = actionsNeeded;
      bestHitAction = hit;
    }
  });

  return bestHitAction;
}

export function normalizeInstructions(
  rawInstructions: SelectedInstruction[],
  targetValue: number,
): ResolvedInstruction[] {
  let instructionSum = 0;

  return rawInstructions.map((instruction) => {
    let action: PickableActionId | ResolvedActionId = instruction.action;

    if (action === 'hit') {
      action = selectBestHit(
        targetValue - instructionSum,
        ['lightHit', 'mediumHit', 'hardHit'],
        targetValue,
      );
    }

    const resolvedAction = action as ResolvedActionId;
    instructionSum += ACTION_VALUES[resolvedAction];
    return { ...instruction, action: resolvedAction };
  });
}

export function calculateSetupActions(
  targetValue: number,
  instructions: ResolvedInstruction[],
): ResolvedActionId[] {
  const instructionSum = instructions.reduce(
    (total, instruction) => total + ACTION_VALUES[instruction.action],
    0,
  );
  const preTargetValue = targetValue - instructionSum;

  if (!Number.isFinite(preTargetValue) || preTargetValue <= 0) {
    return [];
  }

  const dp = Array<number>(preTargetValue + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i <= preTargetValue; i += 1) {
    if (dp[i] === Infinity) {
      continue;
    }

    Object.entries(ACTION_VALUES).forEach(([action, value]) => {
      const nextValue = i + value;

      if (nextValue >= 0 && nextValue <= preTargetValue) {
        dp[nextValue] = Math.min(dp[nextValue], dp[i] + 1);
      }
    });
  }

  const setupActions: ResolvedActionId[] = [];
  let currentValue = preTargetValue;

  while (currentValue > 0 && dp[currentValue] !== Infinity) {
    const nextAction = Object.keys(ACTION_VALUES).find((action) => {
      const resolvedAction = action as ResolvedActionId;
      const prevValue = currentValue - ACTION_VALUES[resolvedAction];
      return prevValue >= 0 && dp[prevValue] === dp[currentValue] - 1;
    }) as ResolvedActionId | undefined;

    if (!nextAction) {
      break;
    }

    setupActions.push(nextAction);
    currentValue -= ACTION_VALUES[nextAction];
  }

  return setupActions.reverse();
}

export function sortInstructions(instructions: ResolvedInstruction[]): ResolvedInstruction[] {
  const last = instructions.filter((instruction) => instruction.priority === 'last');
  const secondLast = instructions.filter((instruction) => instruction.priority === 'second-last');
  const thirdLast = instructions.filter((instruction) => instruction.priority === 'third-last');
  const notLast = instructions.filter((instruction) => instruction.priority === 'not-last');
  const anyPriority = instructions.filter((instruction) => instruction.priority === 'any');

  const sorted = [...thirdLast, ...secondLast, ...notLast, ...last];

  if (anyPriority.length === 0) {
    return sorted;
  }

  let insertionPoint = sorted.length;
  if (last.length > 0 && secondLast.length > 0) {
    insertionPoint = sorted.length - last.length - secondLast.length;
  } else if (last.length > 0) {
    insertionPoint = sorted.length - last.length;
  }

  sorted.splice(insertionPoint, 0, ...anyPriority);
  return sorted;
}
