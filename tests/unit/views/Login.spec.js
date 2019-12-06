// import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  it('Should have the data function', () => {
    expect(typeof Login.data).toBe('function')
  })

  it('Should have config in the data function', () =>  {
    let data = Login.data()
    expect(data.authConfig).not.toBe(null)
  })
})
