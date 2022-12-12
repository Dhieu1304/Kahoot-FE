const mockSlide = {
   id: "1",
   type: "choices",
   title: "Slide 1",
   active: true,
   question: "Muti choice của Sang",
   choices: [
      {
         id: 282612524,
         label: "Option 1",
         position: 0,
         correct_answer: false
      },
      {
         id: 282612525,
         label: "Option 2",
         position: 1,
         correct_answer: false
      },
      {
         id: 282612526,
         label: "Option 3",
         position: 2,
         correct_answer: false
      }
   ],

   dimensions: [
      {
         label: "",
         min: "",
         max: "",
         mid_values: []
      },
      {
         label: "",
         min: "",
         max: "",
         mid_values: []
      }
   ],
   max_votes: 1,
   multiple_votes: false,
   grid: {
      id: "2x2",
      type: "default",
      rotation: 0
   },
   range: {
      min: 0,
      max: 10
   },

   reactions: [],
   hide_voting_instructions: false,

   speaker_notes: null,
   override_theme: false
};

export default mockSlide;
