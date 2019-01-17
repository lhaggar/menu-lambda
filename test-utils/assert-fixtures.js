const assertFixtures = (fixtures, snapshots) => {
  it('should have test fixtures', () => {
    expect(fixtures).not.toHaveLength(0);
  });

  it('should have the same amount of snapshots', () => {
    expect(snapshots).toHaveLength(fixtures.length);
  });
};

module.exports = {
  assertFixtures,
};
