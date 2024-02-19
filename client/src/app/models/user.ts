class User {
    constructor(
        public email: string = "",
        public password: string = "",
        public username: string = "",
        public score: number = 0,
        public friends: string[] = [],
        public games: string[] = [],
        public _id: string = "",
    ){}
}
export default User;