export const resourceIdRegex = '.+';
export const resourceParam = key => `:${key}(${resourceIdRegex})`;

export const topicId = label => `topic/${label}`;
export const journalId = label => `journal/${label}`;

export function isEqual(id1, id2) {
  return decodeURIComponent(id1) === decodeURIComponent(id2);
}
