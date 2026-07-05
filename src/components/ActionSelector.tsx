import ActionIcon from './ActionIcon';
import { PICKABLE_ACTIONS, type PickableActionId } from '../domain/actions';

interface ActionSelectorProps {
  value: PickableActionId | '';
  onChange: (nextValue: PickableActionId | '') => void;
  label: string;
}

export default function ActionSelector({ value, onChange, label }: ActionSelectorProps) {
  return (
    <div className="action-picker" aria-label={label}>
      {PICKABLE_ACTIONS.map((action) => (
        <ActionIcon
          key={action}
          action={action}
          selected={value === action}
          showDescription
          onClick={() => onChange(value === action ? '' : action)}
        />
      ))}
    </div>
  );
}
