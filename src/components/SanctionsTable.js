import React from "react";
import SanctionsEntry from "./SanctionsEntry";
import { Accordion, AccordionItem } from "react-sanfona";
import "../sass/sanctions.scss";
class SanctionsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sanctionData = this.props.sanctions;
    let flatSanctions = [];
    for (let i = 0; i < sanctionData.length; i++) {
      let sanctionTransform = sanctionData[i];
      for (let j = 0; j < sanctionData[i].recipients.length; j++) {
        let newAdd = sanctionTransform;
        // Recipients is now a value!
        newAdd.recipientFlat = sanctionData[i].recipients[j];
        flatSanctions.push(newAdd);
        console.log("push");
      }
    }
    // We now have a flat array listing all sanctions - we can associate these with the candidates

    console.log(sanctionData);
    // Now we want to cycle through the candidates and count their sanctions
    let candidateData = this.props.candidateData;
    for (let i = 0; i < candidateData.length; i++) {
      let searchName = candidateData[i].name;
      // Associate sanctions with the candidate
      candidateData[i].sanctionList = [];
      let number = flatSanctions.reduce((accumulator, currentValue) => {
        if (currentValue.recipientFlat == searchName) {
          candidateData[i].sanctionList.push(currentValue);
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);
      console.log(searchName + "," + number);
      candidateData[i].sanctionCount = number;
    }

    // Now we want to sort the candidate data array
    candidateData.sort((a, b) => {
      if (a.sanctionCount < b.sanctionCount) {
        return 1;
      }
      if (a.sanctionCount > b.sanctionCount) {
        return -1;
      }
      return 0;
    });

    console.log(candidateData);

    let tableSections = candidateData.map(c => (
      <SanctionsEntry
        key={c.name}
        name={c.name}
        slate={c.slate}
        image={c.image}
        count={c.sanctionCount}
        list={c.sanctionList}
      />
    ));
    return (
      // TODO: Map each candidate within the position + their sanctions
      <div>
        <h2>{this.props.positionData.position}</h2>
        {tableSections}
      </div>
    );
  }
}

export default SanctionsTable;
