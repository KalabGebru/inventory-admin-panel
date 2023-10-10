import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  arrayUnion,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../firebase.config";

//   import toast from "react-hot-toast";

const services = {
  AddUserWithARole: async (user) => {
    const usersref = collection(db, "Users");

    try {
      const id = await addDoc(usersref, { ...user });
      return id;
    } catch (err) {
      console.log(err);
      return "something went wrong";
    }
  },
  AddCustomer: async (customer) => {
    const customersref = collection(db, "Customers");

    try {
      const custemerid = await addDoc(customersref, { ...customer });
      const createdref = doc(db, "Customers", custemerid.id);
      await setDoc(
        createdref,
        {
          docId: custemerid.id,
        },
        { merge: true }
      );
      return custemerid;
    } catch (err) {
      console.log(err);
      return "something went wrong";
    }
  },
  AddProduct: async (product) => {
    const productsref = collection(db, "Products");

    try {
      const productid = await addDoc(productsref, { ...product });
      const createdref = doc(db, "Products", productid.id);
      await setDoc(
        createdref,
        {
          docId: productid.id,
        },
        { merge: true }
      );
      return productid;
    } catch (err) {
      console.log(err);
      return "something went wrong";
    }
  },
  GetAllCustomers: async () => {
    const customersref = collection(db, "Customers");
    try {
      const data = await getDocs(customersref);
      const allcustomers = data.docs.map((doc) => doc.data());
      return allcustomers;
    } catch (err) {
      return undefined;
    }
  },
  GetAllProducts: async () => {
    const productssref = collection(db, "Products");
    try {
      const data = await getDocs(productssref);
      const allproducts = data.docs.map((doc) => doc.data());
      return allproducts;
    } catch (err) {
      return undefined;
    }
  },
  GetAllInventorys: async () => {
    const inventorysref = collection(db, "Inventory");
    try {
      const data = await getDocs(inventorysref);
      const allinventorys = data.docs.map((doc) => doc.data());
      return allinventorys;
    } catch (err) {
      return undefined;
    }
  },
  GetAllCatagory: async () => {
    const catagorysref = collection(db, "Catagorys");
    try {
      const data = await getDocs(catagorysref);
      const allcatagorys = data.docs.map((doc) => doc.data());
      return allcatagorys;
    } catch (err) {
      return undefined;
    }
  },
  GetAllSeles: async () => {
    const salesref = collection(db, "Sales");
    try {
      const data = await getDocs(salesref);
      const allsales = data.docs.map((doc) => doc.data());
      return allsales;
    } catch (err) {
      return undefined;
    }
  },
  DeleteCustomer: async (Id) => {
    const customerref = doc(db, "Customers", Id);
    try {
      await deleteDoc(customerref);
      return true;
    } catch (err) {
      console.log(err);
      return "something went wrong";
    }
  },
  UploadImage: async (file) => {
    console.log(file);
    const name = file.name;
    const storageRef = ref(storage, `image/${name}`);
    console.log(storage);
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      let url;
      console.log(uploadTask);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // const progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (err) => {
          console.log(err);
          // Handle unsuccessful uploads
        },
        () => {
          console.log("uploaded?");
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            url = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
      return url;
    } catch (err) {
      console.log(err);
      return "something went wrong";
    }
  },
  EditAllInventory: async (name) => {
    const productssref = collection(db, "Sales");
    try {
      const data = await addDoc(productssref, {
        items: [
          { productId: "0Nn0flH1jjwyilHV2CUQ", no: 3 },
          { productId: "504c4l9P0upwJvRhlHcR", no: 1 },
        ],
        totalAmount: 5000,
        customer: "03P3aB5TJtqzDJrsY1Cl",
        paidIn: "cash",
        discounted: true,
        datetime: new Date().toISOString(),
      });
      // const allproducts = data.docs.map((doc) => doc.data());
      // allproducts.map((P) => {
      //   const productssref = doc(db, "Customers", P.docId);
      //   setDoc(
      //     productssref,
      //     {
      //       credit: { amount: 5000, used: 3000 },
      //       history: [],
      //     },
      //     { merge: true }
      //   );
      // });
      const createdref = doc(db, "Sales", data.id);
      await setDoc(
        createdref,
        {
          docId: data.id,
        },
        { merge: true }
      );
      console.log(data.id);
      return data.id;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  getUserById: async (id) => {
    const usersref = doc(db, "Users", id);

    try {
      const user = await getDoc(usersref);

      return user.data();
    } catch (err) {
      return "something went wrong";
    }
  },
  setQuizs: async (userid, param, Details) => {
    const quizref = collection(db, "Quiz");
    try {
      let quiz;
      await fetch(`https://opentdb.com/api.php?${param}`)
        .then(function (response) {
          return response.json();
        })
        .then((data) => (quiz = data));
      console.log(quiz);

      if (quiz.response_code == 0) {
        function formatQuiz(q, i) {
          const options = q.incorrect_answers;

          options.splice(
            ((options.length + 1) * Math.random()) | 0,
            0,
            q.correct_answer
          );

          return {
            qno: i + 1,
            type: q.type,
            answers: options,
            question: q.question,
            difficulty: q.difficulty,
            correct_answer: q.correct_answer,
            category: q.category,
          };
        }

        // formatQuiz(quiz.results[qNo - 1]);
        const formatedQuiz = quiz.results.map((q, i) => formatQuiz(q, i));

        const res = await addDoc(quizref, {
          results: formatedQuiz,
          details: Details,
          noOfUsers: 1,
        });

        const usersref = doc(db, "Users", userid);
        await setDoc(
          usersref,
          {
            quizs: arrayUnion(...[{ quizId: res.id, details: Details }]),
            answers: arrayUnion(...[{ quizId: res.id, result: [] }]),
          },
          { merge: true }
        );

        return res.id;
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  },
  getQuizByID: async (quizId) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      const quiz = await getDoc(quizref);

      return quiz.data();
    } catch (err) {
      return undefined;
    }
  },
  getAnswersByID: async (userId, quizId) => {
    const userref = doc(db, "Users", userId);
    try {
      const user = await getDoc(userref);

      const currentAnswer = user
        .data()
        .answers?.filter((a) => a.quizId == quizId);

      return currentAnswer[0].result;
    } catch (err) {
      return undefined;
    }
  },
  setAnswer: async (userId, Answers, Quizes) => {
    const usersref = doc(db, "Users", userId);
    try {
      await setDoc(
        usersref,
        {
          answers: Answers,
        },
        { merge: true }
      );
      {
        Quizes &&
          (await setDoc(
            usersref,
            {
              quizs: Quizes,
            },
            { merge: true }
          ));
      }
    } catch (err) {
      return "something went wrong";
    }
  },
  getGrade: async (quizId, Answers) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      const quiz = await getDoc(quizref);

      let grade = 0;

      quiz.data().results.forEach((element, i) => {
        if (element.correct_answer == Answers[i]) grade++;
      });

      return grade;
    } catch (err) {
      return undefined;
    }
  },
  setGradeInQuiz: async (quizId, grade) => {
    const quizref = doc(db, "Quiz", quizId);
    try {
      await setDoc(
        quizref,
        {
          grade: arrayUnion(...[grade]),
        },
        { merge: true }
      );
    } catch (err) {
      return "something went wrong";
    }
  },
  getAllUsers: async () => {
    const userref = collection(db, "Users");
    try {
      const data = await getDocs(userref);
      const alluser = data.docs.map((doc) => doc.data());

      return alluser;
    } catch (err) {
      return undefined;
    }
  },
  setChallenge: async (toUserId, byUser, quizId, quizDetail) => {
    const usersref = doc(db, "Users", toUserId);
    const quizref = doc(db, "Quiz", quizId);
    try {
      await setDoc(
        usersref,
        {
          challenge: arrayUnion(
            ...[
              {
                quizId: quizId,
                by: byUser,
                details: quizDetail,
                accepted: false,
              },
            ]
          ),
        },
        { merge: true }
      );
      const quiz = await getDoc(quizref);

      const OldNoOfUsers = quiz.data().noOfUsers;
      await setDoc(
        quizref,
        {
          noOfUsers: OldNoOfUsers + 1,
        },
        { merge: true }
      );
    } catch (err) {
      return "something went wrong";
    }
  },
  acceptQuizs: async (userid, quizId, Details) => {
    const usersref = doc(db, "Users", userid);
    try {
      await setDoc(
        usersref,
        {
          quizs: arrayUnion(...[{ quizId: quizId, details: Details }]),
          answers: arrayUnion(...[{ quizId: quizId, result: [] }]),
        },
        { merge: true }
      );

      return true;
    } catch (err) {
      return undefined;
    }
  },
};

export default services;

const cat = ["beer", "wine", "wiski", "tekila", "gine"];
