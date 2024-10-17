// Welcome view
const quizzFakeData1 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  topic: {name: "Education 📚"},
  quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: null, order: 1, reactId: "1f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 2, reactId: "2f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 3, reactId: "3f47a620-eaad-46d6-a260-d7fa322c5b24" }
  ]
}

//Settings view
//lastEditedAdmin has an object here
const quizzFakeData2 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  topic: {name: "Education 📚"},
  quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: {name: "Pedro León"}, answer: null, order: 1, reactId: "4f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 2, reactId: "5f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: null, order: 3, reactId: "5f47a620-8aad-46d6-a260-d7fa322c5b24" }
  ]
}


//Results view
//lastEditedAdmin has an object here
//Answer has an object
//Answer.lastEditedAdmin has an object here
const quizzFakeData3 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  topic: {name: "Education 📚"},
  quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: {name: "Pedro León"}, answer: {answer: "42", answerCheckbox: false}, order: 1, reactId: "7f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "I am passionate about beign my self and thats it", answerCheckbox: false}, order: 2, reactId: "8f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "Mondays", answerCheckbox: false, lastEditedAdmin: {name: "Diego Janus"}}, order: 3,  reactId: "9f47a620-eaad-46d6-a260-d7fa322c5b24" },
    { id: 55, typeOfQuestion: 3, title: 'Question 4', description: 'Did you finish task6?', visibleAtTable: true, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "", answerCheckbox: true}, order: 4, reactId: "7f47a620-eaad-46d6-a260-d7fa322c5b66" },
  ]
}
const userResponse1 = {
  id: 534,
  responseDate: Date.now(),
  userId: 444,
  user: {name: "Pedro León"},
  quizzId: 909,
  quizz: {
    title: "Quizz that you have to complete because you are an intern",
    topic: {name: "Education 📚"},
    quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  },
  score: 0
}

//My answers
//Answer has an object
const quizzFakeData4 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  topic: {name: "Education 📚"},
  quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: {answer: "42", answerCheckbox: false}, order: 1, reactId: "9f47a620-1aad-46d6-a260-d7fa322c5b24" },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "I am passionate about beign my self and thats it", answerCheckbox: false}, order: 2, reactId: "9f47a620-2aad-46d6-a260-d7fa322c5b24" },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "Mondays", answerCheckbox: false}, order: 3, reactId: "9f47a620-3aad-46d6-a260-d7fa322c5b24" },
    { id: 55, typeOfQuestion: 3, title: 'Question 4', description: 'Did you finish task6?', visibleAtTable: true, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "", answerCheckbox: true}, order: 4, reactId: "7f47a620-eaad-46d6-a260-d7fa322c5b88" },
  ]
}

//Agregation
//Answer has an object
const quizzFakeData5 = {
  id: 5,
  title: "Quizz that you have to complete because you are an intern",
  topic: {name: "Education 📚"},
  quizzTags: [{tag: {id: 1,name: "Tag1"}},{tag: {id: 2,name: "Tag2"}}],
  userId: 1,
  questions: [
    { id: 1, typeOfQuestion: 2, title: 'Question 1', description: 'How many apples do you eat per day?', visibleAtTable: true, lastEditedAdminId: 999, lastEditedAdmin: null, answer: {answer: "999", answerCheckbox: false}, order: 1, reactId: "9f47a620-4aad-46d6-a260-d7fa322c5b24" },
    { id: 2, typeOfQuestion: 1, title: 'Question 2', description: 'Can you describe a little more of yourself?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "XXX", answerCheckbox: false}, order: 2, reactId: "9f47a620-eaad-56d6-a260-d7fa322c5b24" },
    { id: 44, typeOfQuestion: 0, title: 'Question 3', description: 'At what day do you start working?', visibleAtTable: false, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "XXX", answerCheckbox: false}, order: 3, reactId: "9f47a620-6aad-46d6-a260-d7fa322c5b24" },
    { id: 55, typeOfQuestion: 3, title: 'Question 4', description: 'Did you finish task6?', visibleAtTable: true, lastEditedAdminId: null, lastEditedAdmin: null, answer: {answer: "", answerCheckbox: true}, order: 4, reactId: "7f47a620-eaad-46d6-a260-d7fa322c5b99" },
  ]
}

//Quizz mode








export {quizzFakeData1, quizzFakeData2, quizzFakeData3, quizzFakeData4, quizzFakeData5, userResponse1};