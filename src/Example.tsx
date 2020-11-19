import React from "react"
import "./Example.css"

type FeeClassification = {
  name: string
  description: string
  unitPrice: number
  numOfPeople: number
  totalPrice: number
}

type DetailProps = {
  classification: FeeClassification
  onNumOfPeopleChange: (num:number) => void
}

type SummaryProps = {
  numOfPeople: number
  totalAmount: number
}


type AdmissionFeeCalculatorState = {
  feeClassifications: FeeClassification[];
}

const Detail:  React.FC<DetailProps> = props => {
  const onNumOfPeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChange(num);
  }

  return (
    <div >
      <div className="classification-name">{props.classification.name}</div>
      <div className="description">{props.classification.description}</div>
      <div className="unit-price">{props.classification.unitPrice}円</div>
      <div className="num-people">
        <select value={props.classification.numOfPeople} onChange={e => onNumOfPeopleChange(e)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>名</span>
      </div>
    </div>
  )
}

const Summary: React.FC<SummaryProps> = props => {
  return (
    <div>
      <div className="party">
        <input type="text" className="party" value={props.numOfPeople} />
        <span>名様</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input type="text" className="total-amount" value={props.totalAmount} />
        <span>円</span>
      </div>
    </div>
  )
}

class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}) {
    super(props)
    const adult: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const student: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const children: FeeClassification = {
      name: "子ども",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0,
    }
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0,
    }
    this.state = {
      feeClassifications: [adult, student, children, infants]
    }
  }
  handleNumOfPeopleChange(idx:number, num:number) {
    const curFc = this.state.feeClassifications[idx]
    const newTotalPrice = curFc.unitPrice * num
    const newFc: FeeClassification = Object.assign({}, curFc, {numOfPeople:num, totalPrice: newTotalPrice})
    const feeClassifications = this.state.feeClassifications.slice()
    feeClassifications[idx] = newFc

    this.setState({ feeClassifications: feeClassifications})

  }
  render() {
    const details = this.state.feeClassifications.map((fc, idx) => {
      return (
        <Detail key={idx.toString()} classification={fc} onNumOfPeopleChange={n => this.handleNumOfPeopleChange(idx, n)} />
      )
    })
    const numOfPeople = this.state.feeClassifications.map(fc => fc.numOfPeople).reduce((p,c) => p+c)
    const totalAmount = this.state.feeClassifications.map(fc => fc.totalPrice).reduce((p,c) => p+c)
    return (
      <>
        {details}
        {/* <Detail classification={this.detail.classification}/> */}
        <Summary numOfPeople={numOfPeople} totalAmount={totalAmount}/>
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App

// ReactDOM.render(<App />, document.querySelector(".container"));


// class Timer extends React.Component {
//   constructor(props: any) {
//     super(props)
//     this.state = { seconds: number = 0}
//   }

//   tick() {
//     this.setState(state => ({
//       seconds: state.seconds + 1
//     }))
//   }

//   componentDidMount() {
//     this.interval = setInterval(() => this.tick(), 1000)
//   }
// }

// class Detail extends React.Component {
//   render() {
//     return (
//       <div >
//         <div className="classification-name">名前</div>
//         <div className="description">説明</div>
//         <div className="unit-price">0円</div>
//         <div className="num-people">
//           <select value="0">
//             <option value="0">0</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//           </select>
//           <span>名</span>
//         </div>
//       </div>
//     );
//   }
// }

