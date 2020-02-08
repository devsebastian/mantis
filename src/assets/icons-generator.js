import * as React from 'react'
import cpp from './icons/cpp.svg'
import python from './icons/python.svg'
import css from './icons/css.svg'
import c from './icons/c.svg'
import exe from './icons/exe.svg'
import file from './icons/file.svg'
import pdf from './icons/pdf.svg'
import word from './icons/word.svg'
import document from './icons/document.svg'

export default function FileIcon({ type, cname, size}) {
    return <img className={cname} src={getIcon(type)} height={size} width={size} height={size} />
}

function getIcon(type){
    switch(type){
        case 'c': return c; break;
        case 'cpp': return cpp; break;
        case 'py': return python; break;
        case 'css': return css; break;
        case 'exe': return exe; break;
        case 'docx': return word; break;
        case 'txt': return document; break;
        default: return file;
    }
}