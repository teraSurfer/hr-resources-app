import Home from '@/views/Home.vue';

describe('View -> Home.vue', () => {
    it('Should have the banner component', () => {
        expect(Home.components.Banner).not.toBe(null)
    })
})