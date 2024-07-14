let allUserData = [];
let regForm = document.querySelector(".registraion-form");
let allInputs = regForm.querySelectorAll("input");
let textAreaEl = regForm.querySelector("textarea");
let regList = document.querySelector(".tboday-regList");
let searchEL = document.querySelector(".search");
let searchBtn = document.querySelector(".searchBtn");
let searchForm = document.querySelector(".searchForm");
if (localStorage.getItem("allUserData") != null) {
  let string = localStorage.getItem("allUserData");
  allUserData = JSON.parse(string);
  document.querySelector(".submitBtn").classList.remove("d-none");
}
regForm.onsubmit = (X) => {
  X.preventDefault();

  let user = {
    Name: allInputs[0].value,
    Email: allInputs[1].value,
    Password: allInputs[2].value,
    FatherName: allInputs[3].value,
    Address: textAreaEl.value,
  };
  if (allInputs[0].value != "") {
    if (allInputs[1].value != "") {
      if (allInputs[2].value != "") {
        if (allInputs[3].value != "") {
          if (textAreaEl.value != "") {
            checkEmail = allUserData.find((data) => {
              return data.Email == allInputs[1].value;
            });
            if (checkEmail == undefined) {
              allUserData.push(user);

              let string = JSON.stringify(allUserData);
              localStorage.setItem("allUserData", string);
              showUserData();
              regForm.reset("");
              swal("Good!", "Data reistered Succesful!", "success");
            } else {
              swal("Duplicat email !", "Already Exits !", "warning");
            }
          } else {
            swal("Address is not reistered!");
          }
        } else {
          swal("Father's name is not reistered!");
        }
      } else {
        swal("password is not reistered!");
      }
    } else {
      swal("Email address is not reistered!");
    }
  } else {
    swal("Name is not reistered!");
  }
};

const showUserData = () => {
  regList.innerHTML = "";
  allUserData.forEach((item, index) => {
    regList.innerHTML += `            
    <tr class="allUserData-row">
               <td>${index + 1}.</td>
              <td > ${item.Name}</td>
              <td >${item.Email}</td>
              <td >${item.Password}</td>
              <td >${item.FatherName}</td>
              <td>${item.Address}</td>
              <td class=" btn-desn d-flex"> 
                <button class="btn p-1 px-2 edit-btn btn-success ">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn del-btn p-1 px-2 btn-danger ms-1"> 
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
 `;
  });
  // delete code
  let allDelBtn = regList.querySelectorAll(".del-btn");
  allDelBtn.forEach((el, index) => {
    el.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          allUserData.splice(index, 1);
          localStorage.setItem("allUserData", JSON.stringify(allUserData));
          showUserData();
          swal("ok! Your data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      });
    };
  });
  // update code
  let allEditBtn = regList.querySelectorAll(".edit-btn");
  allEditBtn.forEach((el, index) => {
    el.onclick = () => {
      document.querySelector(".submitBtn").classList.add("d-none");
      document.querySelector(".updateBtn").classList.remove("d-none");
      let tr = el.parentElement.parentElement;
      let allTd = tr.querySelectorAll("td");
      // for (let i = 1; i < allTd.length - 1; i++) {
      //   allTd[i].style.border = "2px solid red";
      //   allTd[i].contentEditable = true;
      //   let btnTd = allTd[allTd.length - 1];
      //   let editBtn = btnTd.querySelector("button");
      //   editBtn.innerHTML = "<i class='fa fa-save'></i>";
      //   editBtn.onclick = () => {
      //     let obj = {
      //       name: allTd[1].innerText.trim(),
      //       email: allTd[2].innerText.trim(),
      //       password: allTd[3].innerText.trim(),
      //       fatherName: allTd[4].innerText.trim(),
      //       address: allTd[5].innerText.trim(),
      //     };
      //     allUserData[index] = obj;
      //     localStorage.setItem("allUserData", JSON.stringify(allUserData));
      //     showUserData();
      //   };
      // }
      for (let i = 1; i < allTd.length - 2; i++) {
        allInputs[i - 1].value = allTd[i].innerHTML;
      }
      textAreaEl.value = allTd[allTd.length - 2].innerText;
      let updateBtn = regForm.querySelector(".updateBtn");

      updateBtn.onclick = (X) => {
        X.preventDefault();
        let user = {
          Name: allInputs[0].value,
          Email: allInputs[1].value,
          Password: allInputs[2].value,
          FatherName: allInputs[3].value,
          Address: textAreaEl.value,
        };
        if (allInputs[0].value !== " ") {
          if (allInputs[1].value != " ") {
            if (allInputs[2].value != " ") {
              if (allInputs[3].value != " ") {
                if (textAreaEl.value != " ") {
                  allUserData.splice(index, 1, user);
                  let string = JSON.stringify(allUserData);
                  localStorage.setItem("allUserData", string);
                  showUserData();
                  document
                    .querySelector(".submitBtn")
                    .classList.remove("d-none");
                  document.querySelector(".updateBtn").classList.add("d-none");
                  regForm.reset("");
                  // location.reload();
                  swal("Good!", "Data update Succesfully !", "success");
                } else {
                  swal("Address is not reistered!");
                }
              } else {
                swal("Father's name is not reistered!");
              }
            } else {
              swal("password is not reistered!");
            }
          } else {
            swal("Email address is not reistered!");
          }
        } else {
          swal("Name is not reistered!");
        }
      };
    };
  });
};
showUserData();
// search code
searchBtn.onclick = () => {
  search();
  searchForm.reset("");
};
const search = () => {
  let value = searchEL.value.toLowerCase();
  let allTr = regList.querySelectorAll("tr");
  for (let i = 0; i < allTr.length; i++) {
    let allTd = allTr[i].querySelectorAll("td");
    let name = allTd[1].innerText.toLocaleLowerCase();
    let email = allTd[2].innerText.toLocaleLowerCase();
    let password = allTd[3].innerText.toLocaleLowerCase();
    let fatherName = allTd[4].innerText.toLocaleLowerCase();
    let address = allTd[5].innerText.toLocaleLowerCase();
    if (name.indexOf(value) != -1) {
      allTr[i].classList.remove("d-none");
    } else if (email.indexOf(value) != -1) {
      allTr[i].classList.remove("d-none");
    } else if (password.indexOf(value) != -1) {
      allTr[i].classList.remove("d-none");
    } else if (fatherName.indexOf(value) != -1) {
      allTr[i].classList.remove("d-none");
    } else if (address.indexOf(value) != -1) {
      allTr[i].classList.remove("d-none");
    } else {
      allTr[i].classList.add("d-none");
    }
  }
};
