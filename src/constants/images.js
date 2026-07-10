export const IMG = {
    hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80',
    galA: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    galB: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    galC: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80',
    galD: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    galE: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80',
    galF: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80',
    galG: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80',
    galH: 'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=600&q=80',
    s1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    s2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    s3: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
    s4: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    s5: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    s6: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  };
  
  export const svcImg = (seed) =>
    seed.startsWith('http')
      ? seed
      : `https://images.unsplash.com/photo-${seed}?w=500&q=80&auto=format&fit=crop`;