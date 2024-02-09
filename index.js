class RegistrationForm {
  constructor() {
    this.form = document.querySelector("form");
    this.regNama = document.getElementById("regNama");
    this.regUmur = document.getElementById("regUmur");
    this.regJajan = document.getElementById("regJajan");
    this.tableBody = document.getElementById("table-body");
    this.resume = document.getElementById("resume");
    this.registForm = [];

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.regNama.value.length < 10) {
      this.regNama.classList.add("is-invalid");
      return;
    }

    if (this.regUmur.value < 25) {
      this.regUmur.classList.add("is-invalid");
      return;
    }

    if (this.regJajan.value < 100000 || this.regJajan.value > 1000000) {
      this.regJajan.classList.add("is-invalid");
      return;
    }

    this.registForm.push({
      nama: this.regNama.value,
      umur: parseInt(this.regUmur.value),
      jajan: parseFloat(this.regJajan.value),
    });

    this.regNama.value = "";
    this.regUmur.value = "";
    this.regJajan.value = "";

    await this.displayList();

    this.displayResume();

    this.showValid();
  }

  async displayList() {
    this.tableBody.innerHTML = "";

    for (let i = 0; i < this.registForm.length; i++) {
      const row = `<tr>
                      <th scope="row">${i + 1}</th>
                      <td>${this.registForm[i].nama}</td>
                      <td>${this.registForm[i].umur}</td>
                      <td>${this.registForm[i].jajan}</td>
                    </tr>`;
      this.tableBody.innerHTML += row;
    }
  }

  displayResume() {
    const averageUmur = this.getAverageFromList(this.registForm, "umur");
    const averageJajan = this.getAverageFromList(this.registForm, "jajan");

    this.resume.innerHTML = `Rata - rata usia terdaftar adalah ${
      Math.round(averageUmur * 100) / 100
    } tahun dan rata - rata uang saku terdaftar sebesar Rp ${
      Math.round(averageJajan * 100) / 100
    }`;
  }

  getAverageFromList(list, property) {
    const values = list.map((item) => item[property]);
    const total = values.reduce((sum, value) => sum + value, 0);
    const averumur = total / list.length;
    return averumur;
  }

  showValid() {
    const Valid = document.createElement("div");
    Valid.classList.add("alert", "alert-success");
    Valid.textContent = "Berhasil mendaftar!";

    const form = document.querySelector("form");
    form.parentNode.insertBefore(Valid, form.nextSibling);

    setTimeout(() => {
      Valid.remove();
    }, 3000);
  }
}

const registrationForm = new RegistrationForm();
