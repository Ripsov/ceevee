import React from 'react';
import PDF from './components/pdf/templates/PDF'
import styles from './App.css';
import UI from './components/ui/UI'
import { pdfjs } from 'react-pdf'
import { pdf } from '@react-pdf/renderer'
import { Document, Page } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      base64: 'JVBERi0xLjIgCjkgMCBvYmoKPDwKPj4Kc3RyZWFtCkJULyA5IFRmKFRlc3QpJyBFVAplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA1IDAgUgovQ29udGVudHMgOSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0tpZHMgWzQgMCBSIF0KL0NvdW50IDEKL1R5cGUgL1BhZ2VzCi9NZWRpYUJveCBbIDAgMCA5OSA5IF0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1BhZ2VzIDUgMCBSCi9UeXBlIC9DYXRhbG9nCj4',
      blob: null
    }
    this.getBase64 = this.getBase64.bind(this);
  }

  getBase64(template) {
    var reader = new FileReader();
    pdf(template).toBlob().then((blob) => {
      this.blob = blob
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.setState({
          base64: reader.result
        })
      }
    })
  }

  componentDidMount() {
    this.getBase64(<PDF />)
  }

  componentDidUpdate() {
    console.log(this.state.base64)
  }

  render() {
    return (
      <div className="container">
        <div className="ui" style={styles.ui}>
          <UI />
        </div>
        <div className="pdf">
          <Document file={`${this.state.base64}`}>
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>

    )
  }
}
