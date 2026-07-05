import ActionIcon from './ActionIcon';
import { ACTIONS, type ResolvedActionId } from '../domain/actions';

interface ResultStripProps {
  title: string;
  actions: ResolvedActionId[];
  emptyText: string;
}

export default function ResultStrip({ title, actions, emptyText }: ResultStripProps) {
  return (
    <section className="result-strip">
      <h3>{title}</h3>
      <div className="action-row">
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <ActionIcon
              key={`${action}-${index}`}
              action={action}
              button={false}
              className="result-icon"
              description={ACTIONS[action].label}
              showDescription
            />
          ))
        ) : (
          <span className="empty-result">{emptyText}</span>
        )}
      </div>
    </section>
  );
}
