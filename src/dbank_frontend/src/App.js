import { dbank_backend } from "../../declarations/dbank_backend";


class App {
 
  constructor() {
    this.#render();
  }

 async #render() {
  window.addEventListener("load", async () => {
    console.log("finished loading");
    await this.update();
  });

    document.querySelector("form").addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("submit hit!")
      const button = event.target.querySelector("#submit-btn")
      const inputAmount = parseFloat(document.getElementById("input-amount").value) || 0;
      const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value) || 0;
      
      button.setAttribute("disabled",true);

      if (inputAmount > 0) {
        await dbank_backend.topUp(inputAmount);
      }
    
      if (outputAmount > 0) {
        await dbank_backend.withDraw(outputAmount); // works with your current backend
      }
     await dbank_backend.compound();
      await this.update();
      document.getElementById("input-amount").value = "";
      document.getElementById("withdrawal-amount").value = "";
      button.removeAttribute("disabled");
    });
    
  }
 async update()
    {
      const currentAmount = await dbank_backend.checkBalance();
      document.getElementById('value').innerText = Math.round(currentAmount * 100) / 100;
    }
}

export default App;
