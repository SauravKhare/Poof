import { customAlphabet } from "nanoid";

const ALGOS = [
  'adversary', 'algorithm', 'alphabet', 'ancestor', 'array', 'automaton',
  'bag', 'bintree', 'bisector', 'block', 'bound', 'branch', 'bridge',
  'bucket', 'capacity', 'centroid', 'certificate', 'chain', 'child',
  'circuit', 'clique', 'collision', 'combination', 'complexity',
  'configuration', 'conjunction', 'cut', 'cycle', 'degree', 'depth',
  'deque', 'diameter', 'dictionary', 'digraph', 'distance', 'edge',
  'exponential', 'factor', 'factorial', 'flow', 'forest', 'fractal',
  'function', 'graph', 'grid', 'hash', 'head', 'heap', 'height',
  'interval', 'iteration', 'key', 'language', 'leaf', 'link', 'list',
  'matrix', 'mean', 'median', 'mode', 'model', 'node', 'negation',
  'null', 'octree', 'occurrence', 'parent', 'path', 'pattern',
  'permutation', 'performance', 'pointer', 'polytope', 'poset',
  'predicate', 'prefix', 'quadtree', 'queue', 'radix', 'range',
  'recursion', 'recurrence', 'reduction', 'relation', 'relaxation',
  'root', 'rotation', 'sort', 'set', 'sequence', 'sum', 'segment',
  'sink', 'stack', 'string', 'suffix', 'tail', 'tournament', 'tree',
  'trie', 'union', 'vertex', 'weight', 'window'
];

const ADJECTIVES = [
  'accepting', 'adventurous', 'affable', 'ambitious', 'amiable',
  'amicable', 'annoying', 'bold', 'brave', 'bright', 'brutal',
  'brute', 'callous', 'calm', 'careful', 'cautious', 'charitable',
  'cheerful', 'clever', 'courtly', 'creative', 'cruel', 'curious',
  'daring', 'devout', 'eager', 'elegant', 'energetic', 'excited',
  'ferocious', 'forgiving', 'free', 'friendly', 'funny', 'generous',
  'genteel', 'gentle', 'graceful', 'grim', 'grouchy', 'happy',
  'heartless', 'helpful', 'honest', 'humane', 'humble', 'impulsive',
  'independent', 'indulgent', 'intense', 'inventive', 'kind',
  'lazy', 'lenient', 'loyal', 'meek', 'merciless', 'merry',
  'messy', 'mild', 'neat', 'nervous', 'obliging', 'obnoxious',
  'odious', 'patient', 'plain', 'pleasant', 'polite', 'proper',
  'proud', 'quick', 'quiet', 'refined', 'relaxed', 'religious',
  'respectful', 'rude', 'savage', 'selfish', 'sensitive',
  'serious', 'shrewd', 'silly', 'simple', 'smart', 'soft',
  'sophisticated', 'stern', 'strong', 'stubborn', 'tender',
  'tense', 'timid', 'tough', 'trusting', 'urbane', 'vain',
  'vicious', 'violent', 'warm', 'wise', 'witty'
];

const alphabetWithoutHyphen = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function createRandomUsername() {
  const algo = ALGOS[Math.floor(Math.random() * ALGOS.length)];
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const garbage = customAlphabet(alphabetWithoutHyphen, 4);
  const randomID = garbage();

  return `${adjective}-${algo}-${randomID}`;

}