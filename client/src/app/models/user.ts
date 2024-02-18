class User {
    constructor(
        public email: string = "",
        public password: string = "",
        public username: string = "",
        public score: number = 0,
        public _id: number = 0
    ){}
}
export default User;
