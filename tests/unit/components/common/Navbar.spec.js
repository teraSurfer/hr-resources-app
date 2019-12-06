import Navbar from '@/components/common/Navbar.vue';

describe('Components -> Navbar.vue', () => {
    it('Should have variant', () => {
        expect(typeof Navbar.computed.variant).toBe('function')
    })
    it('Should have classes', () => {
        expect(typeof Navbar.computed.classes).toBe('function')
    })
    it('Should have isLoggedIn', () => {
        expect(typeof Navbar.computed.isLoggedIn).toBe('function')
    })
    it('Should have logout', () => {
        expect(typeof Navbar.methods.logout).toBe('function')
    })
    it('Should have getUserName', () => {
        expect(typeof Navbar.methods.getUserName).toBe('function')
    })
    it('Should have mounted', () => {
        expect(typeof Navbar.mounted).toBe('function')
    })
    it('Should have data function', () => {
        expect(typeof Navbar.data).toBe('function')
    })
    it('Should have username', () => {
        let d = Navbar.data();
        expect(d.username).toBe('')    
    })
})