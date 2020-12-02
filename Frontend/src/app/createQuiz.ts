export class CreateQuiz {

    constructor(
        public quizId: number,
        public quizName: string,
        public description: string,
        public isLiveStatus: boolean,
        public username: string,
        public quizTime: number,
        public startDate: Date,
        public endDate: Date,
        public createdDate: Date
    ){}
}