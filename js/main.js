M.AutoInit();

const claimForm = document.querySelector("#getClaimDataForm");
const claimId = document.querySelector("#claimId");
const url = `https://hixapitest.biminihealthcareng.com`;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJiYmMxZWQ1Ni00OGMwLTQ4NzMtOTliNS1kM2U2OWZiODdiZDMiLCJFbWFpbCI6ImFkZWZlbWkxMDFAZ21haWwuY29tIiwibmJmIjoxNTgxOTQ5NzUxLCJleHAiOjE1ODE5NjQxNTEsImlhdCI6MTU4MTk0OTc1MX0.aVdlW6p8T4w-uzWixZX3ctLcavT0hZcStnw-e8NuZSs";

let claimOutput = "";
let claimDisplay = document.querySelector("#claimDataDisplay");

claimForm.addEventListener("submit", e => {
  e.preventDefault();
  getClaimData(claimId.value);
});

const getClaimData = id => {
  M.toast({ html: "Please hold!" });
  fetch(`${url}/api/thirdpartyclaim/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const claimData = {
        Policy_Number: data.Policy_Number,
        Member_Number: data.Member_Number,
        Hospital_Id: data.Hospital_Id,
        HMO_Id: data.HMO_Id,
        Tests: [
          {
            Code: data.ThirdPartyTests[0].Code,
            Description: data.ThirdPartyTests[0].Description,
            UnitCost: data.ThirdPartyTests[0].UnitCost,
            Units: data.ThirdPartyTests[0].Units,
            TotalAmountClaimed: data.ThirdPartyTests[0].TotalAmountClaimed
          }
        ],
        Treatments: [
          {
            Code: data.ThirdPartyTreatment[0].Code,
            Description: data.ThirdPartyTreatment[0].Description,
            UnitCost: data.ThirdPartyTreatment[0].UnitCost,
            Units: data.ThirdPartyTreatment[0].Units,
            TotalAmountClaimed: data.ThirdPartyTreatment[0].TotalAmountClaimed
          }
        ],
        Medications: [
          {
            Code: data.ThirdPartyMedication[0].Code,
            Description: data.ThirdPartyMedication[0].Description,
            UnitCost: data.ThirdPartyMedication[0].UnitCost,
            Units: data.ThirdPartyMedication[0].Units,
            TotalAmountClaimed: data.ThirdPartyMedication[0].TotalAmountClaimed
          }
        ],
        Diagnosis: [
          {
            Code: data.ThirdPartyDiagnosis[0].Code,
            Description: data.ThirdPartyDiagnosis[0].Description
          }
        ]
      };

      claimDisplay.innerHTML = `
      <form>
      <div class="row">
          <div class="input-field col s4">
            <input type="text" name="hospitalId" value="${claimData.Hospital_Id}" id="hospitalId" readonly>
            <label class="active" for="hospitalId">Hospital ID</label>
          </div>
          <div class="input-field col s4">
            <input type="text" name="HMO_Id" value="${claimData.HMO_Id}" id="HMO_Id" readonly>
            <label class="active" for="HMO_Id">HMO ID</label>
          </div>
          <div class="input-field col s4">
            <input type="text" name="Policy_Number" value="${claimData.Policy_Number}" id="Policy_Number" readonly>
            <label class="active" for="Policy_Number">Policy Number</label>
          </div>
          <div class="input-field col s4">
            <input type="text" name="Member_Number" value="${claimData.Member_Number}" id="Member_Number" readonly>
            <label class="active" for="Member_Number">Member Number</label>
          </div>
      </div>
  </form>
      `;

      postClaimData(claimData);
    })
    .catch(err => {
      console.log(err);
    });
};

const postClaimData = data => {
  fetch(`${url}/api/claim`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.IsSuccess == true) {
        M.toast({ html: data.Message });
      } else if (data.IsSuccess == false) {
        M.toast({ html: data.Message });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
