const { addSectionEffects } = require('./section-effects');

describe('addSectionEffects', () => {
  it('should add christmas effects for "christmas"', () => {
    const section = {
      title: 'Vegetarian Station',
      subsections: {
        sides: ['Caramelised carrots, buttered sprouts and roast potatoes'],
      },
      color: '#008575',
      body: [
        'christmas lunch - Mushroom and sage wellington served with all the trimming including butternut stuffing balls and a rich gravy (v)',
      ],
    };
    const res = addSectionEffects(section);

    expect(res).toEqual({
      title: '🎄 Vegetarian Station 🎅🏼',
      subsections: {
        sides: ['Caramelised carrots, buttered sprouts and roast potatoes'],
      },
      color: '#008575',
      body: [
        'christmas lunch - Mushroom and sage wellington served with all the trimming including butternut stuffing balls and a rich gravy (v)',
      ],
    });
    // Assert against mutation
    expect(res).not.toBe(section);
  });

  it('should add christmas effects for "xmas"', () => {
    const section = {
      title: 'From the Oven',
      subsections: {
        sides: ['Caramelised carrots, buttered sprouts and roast potatoes'],
      },
      color: '#C41017',
      body: [
        'xmas lunch - Traditional roast turkey with all the trimmings including pigs in blankets, chestnut stuffing and chefs ultimate turkey jus',
      ],
    };
    const res = addSectionEffects(section);

    expect(res).toEqual({
      title: '🎄 From the Oven 🎅🏼',
      subsections: {
        sides: ['Caramelised carrots, buttered sprouts and roast potatoes'],
      },
      color: '#C41017',
      body: [
        'xmas lunch - Traditional roast turkey with all the trimmings including pigs in blankets, chestnut stuffing and chefs ultimate turkey jus',
      ],
    });
    // Assert against mutation
    expect(res).not.toBe(section);
  });

  it('should not add christmas effects', () => {
    const sectionJson =
      '{"title":"From the Oven","subsections":{"sides":["crisps"]},"color":"#C41017","body":["regular lunch - some cheese sandwiches"]}';
    const section = JSON.parse(sectionJson);
    const res = addSectionEffects(section);

    expect(res).toEqual(JSON.parse(sectionJson));
    expect(res).toBe(section);
  });

  it('should add christmas and pizza effects for "xmas" and "pizza"', () => {
    const section = {
      title: 'From the Oven',
      subsections: {
        'made to order pizza bar': [
          'fresh Khobez base served with a selection of delicious xmas toppings',
        ],
      },
      color: '#C41017',
    };
    const res = addSectionEffects(section);

    expect(res).toEqual({
      title: '🎄 From the Oven 🎅🏼 🍕',
      subsections: {
        'made to order pizza bar': [
          'fresh Khobez base served with a selection of delicious xmas toppings',
        ],
      },
      color: '#C41017',
    });
    // Assert against mutation
    expect(res).not.toBe(section);
  });

  it('should add pizza effects for "pizza"', () => {
    const section = {
      title: 'From the Oven',
      subsections: {
        'made to order pizza bar': [
          'fresh Khobez base served with a selection of delicious toppings',
        ],
      },
      color: '#C41017',
    };
    const res = addSectionEffects(section);

    expect(res).toEqual({
      title: 'From the Oven 🍕',
      subsections: {
        'made to order pizza bar': [
          'fresh Khobez base served with a selection of delicious toppings',
        ],
      },
      color: '#C41017',
    });
    // Assert against mutation
    expect(res).not.toBe(section);
  });
});
