import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      console.log('Arquivo aceito!');
      acceptedFiles.forEach((file) => {
        processFile(file);
      });
    } else {
      console.log('Nenhum arquivo aceito');
    }
  }, []);

  


  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,

  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <div>Arraste e solte seus arquivos .h aqui.</div>
    </div>
  )
}

function processFile(inputFile) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const data = event.target.result;

    //expressão regular para encontrar o nome
    const classRegex = /class\s+(\w+)/g;

    let match;
    let className;

    while ((match = classRegex.exec(data)) !== null) {
      className = match[1];
      break; 
    }

    //expressão regular para encontrar os métodos e constantes
    const methodRegex = /(public|protected|private|static)?\s*([\w\<\>\[\]]+)\s+(\w+)\s*(\(.*?\))?\s*(=\s*[^;]+)?\s*(\{?|[^;])/g;

    let metodos = [];

    while ((match = methodRegex.exec(data)) !== null) {
      if (match[5]) {
        //constante
        metodos.push("'" + match[2] + ' ' + match[3] + match[5] + "'");
      } else if (match[4]) {
        //metodo
        metodos.push("'" + match[2] + ' ' + match[3] + match[4] + "'");
      }
    }

    // formata o que vai escrever
    let output = "    {\n        name: '" + className + "',\n        color:'blue',\n        extras:{\n          type:'component',\n        },\n        methods:[\n            "+metodos.join(',\n            ') + "\n        ]\n    },";

    // envia pro server o que o regex pegar
    fetch('http://localhost:3001/process-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ output })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  reader.readAsText(inputFile);
}


export default DropzoneComponent;

