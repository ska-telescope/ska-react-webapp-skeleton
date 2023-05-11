import { userSliceActions } from './userSlice';
describe('User slice actions', () => {
    it("should update",() => {
        const payload = {role: 'role', username: 'username'}
        const result = userSliceActions.update({role: 'role', username: 'username'})
        expect(result).toMatchObject({payload})
    })

    it("should clear",() => {
        const result = userSliceActions.clear()
        expect(result).toBeTruthy()
    })
});