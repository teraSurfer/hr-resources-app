import Profile from '@/views/Profile.vue'

describe('Profile.vue', () => {
  it('Should have the data function', () => {
    expect(typeof Profile.data).toBe('function')
  })
  it('Should have a mounted method', () =>  {
    expect(typeof Profile.mounted).toBe('function')
  })
  it('Should have a load user method', () => {
      expect(typeof Profile.methods.loadUser).toBe('function')
  })
  it('Data should have show element', () => {
      let d = Profile.data();
      expect(d.show).toBe(false)
  })
})