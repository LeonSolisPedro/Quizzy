// Welcome view
const quizzFakeData1 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: null, order: 1 },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 3 }
  ]
}

//Settings view
//lastEditedAdmin has an object here
const quizzFakeData2 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: {name: "Pedro León"}, answer: null, order: 1 },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 3 }
  ]
}


//Results view
//lastEditedAdmin has an object here
//Answer has an object
//Answer.lastEditedAdmin has an object here
const quizzFakeData3 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: {name: "Pedro León"}, answer: {answer: "42", answerCheckbox: false}, order: 1 },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "I am passionate about beign my self and thats it", answerCheckbox: false}, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "Mondays", answerCheckbox: false, lastEditedAdmin: {name: "Diego Janus"}}, order: 3 }
  ]
}

//My answers
//Answer has an object
const quizzFakeData4 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: {answer: "42", answerCheckbox: false}, order: 1 },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "I am passionate about beign my self and thats it", answerCheckbox: false}, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "Mondays", answerCheckbox: false}, order: 3 }
  ]
}

//Agregation
//Answer has an object
const quizzFakeData5 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: {answer: "999", answerCheckbox: false}, order: 1 },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "XXX", answerCheckbox: false}, order: 2 },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "XXX", answerCheckbox: false}, order: 3 }
  ]
}

//Quizz mode








export {quizzFakeData1, quizzFakeData2, quizzFakeData3, quizzFakeData4, quizzFakeData5};