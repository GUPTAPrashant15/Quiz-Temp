
import { Question } from './question';

export class Quiz {
    quizId: number;
    quizName: string;
    description: string;
    username:string;
    createdDate: Date;
    questions: Question[];
    l: number;
    time: number;
    constructor(data: any) {
        if (data) {
            this.quizId = data.quizId;
            this.quizName = data.quizName;
            this.description = data.description;
            this.time=2;
            this.l=0;
            this.questions = [];
            data.questions.forEach(q => {
                this.questions.push(new Question(q));
                this.l=this.l+1;

            });
        }
    }
}
