class User {
    constructor(
        public email: string = "",
        public password: string = "",
        public username: string = "",
        public score: number = 0,
        public _id: string = "",
        public friends: [] = [],
        public games: [] = []
    ){}
}
export default User;
