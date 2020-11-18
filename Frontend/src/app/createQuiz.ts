export class CreateQuiz {

    constructor(
        public quizId: number,
        public username: string,
        public quizName: string,
        public isLiveStatus: boolean,
        public description: string
    ){}
}