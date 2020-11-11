import { Answer } from './answer';


export class Question {
    quesId: number;
    question: string;
    quesType: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: Answer;
    textAnswer: string;
    //answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.quesId = data.quesId;
        this.question = data.question;
        this.option1=data.option1;
        this.option2=data.option2;
        this.option3=data.option3;
        this.option4=data.option4;
        this.quesType = data.quesType;
        this.answer=new Answer();
        
    }
}
