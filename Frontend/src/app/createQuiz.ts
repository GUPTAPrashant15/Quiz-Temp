export class CreateQuiz {

    constructor(
        public quizId: number,
        public username: string,
        public quizName: string,
        public description: string
    ){}
}