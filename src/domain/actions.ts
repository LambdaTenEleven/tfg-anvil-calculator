const TEXTURE_PATH = `${import.meta.env.BASE_URL}textures`;

export const ACTIONS = {
  punch: { label: 'Punch', value: 2, icon: 'punch.png' },
  bend: { label: 'Bend', value: 7, icon: 'bend.png' },
  upset: { label: 'Upset', value: 13, icon: 'upset.png' },
  shrink: { label: 'Shrink', value: 16, icon: 'shrink.png' },
  hit: { label: 'Hit', value: null, icon: 'hit_any.png' },
  lightHit: { label: 'Light Hit', value: -3, icon: 'hit_light.png' },
  mediumHit: { label: 'Medium Hit', value: -6, icon: 'hit_medium.png' },
  hardHit: { label: 'Hard Hit', value: -9, icon: 'hit_hard.png' },
  draw: { label: 'Draw', value: -15, icon: 'draw.png' },
} as const;

export type ActionId = keyof typeof ACTIONS;
export type PickableActionId = 'punch' | 'bend' | 'upset' | 'shrink' | 'hit' | 'draw';
export type ResolvedActionId = Exclude<ActionId, 'hit'>;

export const ACTION_VALUES: Record<ResolvedActionId, number> = {
  punch: ACTIONS.punch.value,
  bend: ACTIONS.bend.value,
  upset: ACTIONS.upset.value,
  shrink: ACTIONS.shrink.value,
  lightHit: ACTIONS.lightHit.value,
  mediumHit: ACTIONS.mediumHit.value,
  hardHit: ACTIONS.hardHit.value,
  draw: ACTIONS.draw.value,
};

export const PICKABLE_ACTIONS = [
  'punch',
  'bend',
  'upset',
  'shrink',
  'hit',
  'draw',
] as const satisfies readonly PickableActionId[];

export const PRIORITIES = [
  { value: '', label: 'None' },
  { value: 'last', label: 'Last' },
  { value: 'second-last', label: 'Second Last' },
  { value: 'third-last', label: 'Third Last' },
  { value: 'not-last', label: 'Not Last' },
  { value: 'any', label: 'Any' },
] as const;

export type PriorityValue = (typeof PRIORITIES)[number]['value'];

export interface Instruction {
  action: PickableActionId | '';
  priority: PriorityValue;
}

export interface SelectedInstruction {
  action: PickableActionId;
  priority: Exclude<PriorityValue, ''>;
}

export interface ResolvedInstruction {
  action: ResolvedActionId;
  priority: Exclude<PriorityValue, ''>;
}

export function emptyInstruction(): Instruction {
  return { action: '', priority: '' };
}

export function textureUrl(action: ActionId | null): string {
  return `${TEXTURE_PATH}/${action ? ACTIONS[action].icon : 'empty.png'}`;
}
