const submitButton = document.querySelector("button.submit-button")
const inputNama = document.getElementById("inputNama")
const inputUmur = document.getElementById("inputUmur")
const inputSangu = document.getElementById("inputSangu")
const tbody = document.querySelector("tbody.table-group-divider")
const resumeCard = document.querySelector("div.resume-card")
const resume = document.querySelector("h5.resume")

function resetAllInput()
{
  inputNama.value = ""
  inputUmur.value = ""
  inputSangu.value = ""
}

class Pendaftar {
  constructor(nama, umur, uangSangu)
  {
    this.nama = nama
    this.umur = umur
    this.uangSangu = uangSangu
  }
}

function thousandSeparator(num)
{
  return num.toLocaleString("id-ID")
}

async function getAverageFromList(array, property)
{
  const averumur = array.reduce((a, b) => a + b[property], 0) / array.length
  return averumur
}

function alertSuccess()
{
  Swal.fire({
    icon: "success",
    title: "Berhasil Menambahkan ke List"
    })
}

const listPendaftar = []

submitButton.addEventListener("click", async function(event)
{
  event.preventDefault()
  const form = document.querySelector(".needs-validation")

  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add("was-validated")
  } else {
    form.classList.remove("was-validated")
    listPendaftar.push(new Pendaftar(inputNama.value, parseInt(inputUmur.value), parseInt(inputSangu.value)))
    resetAllInput()

    const averageUmur = await getAverageFromList(listPendaftar, "umur")
    const averageUangSangu = await getAverageFromList(listPendaftar, "uangSangu")

    const element = `
    ${listPendaftar.map(({nama, umur, uangSangu}, index) => `
      <tr>
        <th scope="row">${index + 1}</td>
        <td>${nama}</td>
        <td>${umur}</td>
        <td>Rp${thousandSeparator(uangSangu)}</td>
      </tr>`
      ).join("")} 
    `
    
    tbody.innerHTML = element

    resumeCard.style.display = "block"
    resume.innerHTML = `Rata rata pendaftar memiliki uang sangu sebesar Rp${thousandSeparator(averageUangSangu)} dengan rata rata umur ${thousandSeparator(averageUmur)} tahun`
    alertSuccess()
  }
})