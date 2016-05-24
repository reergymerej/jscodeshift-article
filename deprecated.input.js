import g from 'geometry';
import otherModule from 'otherModule';

const radius = 20;
const area = g.circleArea(radius);

console.log(area === Math.pow(g.getPi(), 2) * radius);
console.log(area === otherModule.circleArea(radius));
