// data.js - export an array of build objects
export const builds = [
{
id: 'bmw-01',
name: 'Stratos Runner',
category: 'car',
description: 'A lightweight sprint car built for speed on icy tracks.',
image: 'images/build1.jpg',
caption: 'Stratos Runner tearing across an ice track.',
tags: ['speed','track','ice'],
speed: 92,
weight: 420,
pieces: 540,
difficulty: 6
},
{
id: 'hover-01',
name: 'Sky Drifter',
category: 'plane',
description: 'An easy-to-fly VTOL hybrid with decent cargo capacity.',
image: 'images/build2.jpg',
caption: 'Sky Drifter hovering near sunset.',
tags: ['vtol','cargo','easy'],
speed: 70,
weight: 920,
pieces: 820,
difficulty: 7
},
{
id: 'boat-01',
name: 'Wake Rider',
category: 'boat',
description: 'High maneuverability and good top speed on water.',
image: 'images/build3.jpg',
caption: 'Wake Rider carving through the waves.',
tags: ['water','maneuver','speed'],
speed: 65,
weight: 780,
pieces: 640,
difficulty: 5
},
// add more objects as you build
];


export const categories = Array.from(new Set(builds.map(b => b.category)));