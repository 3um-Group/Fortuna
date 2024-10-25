export const getTestGroup = (): TestGroup => {
// Get or set persistent test group assignment
const storedGroup = localStorage.getItem('oauth_test_group');
if (storedGroup === 'control' || storedGroup === 'variant') {
    return storedGroup;
}
// Randomly assign new users to test groups with 50/50 split
const newGroup: TestGroup = Math.random() < 0.5 ? 'control' : 'variant';
localStorage.setItem('oauth_test_group', newGroup);
return newGroup;
};