import * as React from 'react'

const fs = window.require('fs')

function File(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" width={props.size}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill="#ffca28" d="M13 4H6v16h12V9h-5z" opacity=".3" />
            <path fill="#ffca28" d="M20 8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm-2 12H6V4h7v5h5v11z" />
        </svg>)
}

function Exe(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" width={props.size}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill="#f00" d="M5 8h14v10H5z" opacity=".3" />
            <path fill="#f00" d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z" />
        </svg>
    )
}

function Folder({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path fill="#90a4ae" d="M11.17 8l-.58-.59L9.17 6H4v12h16V8h-8z" opacity=".3" />
            <path fill="#90a4ae" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l1.41 1.41.59.59H20v10z" />
        </svg>
    )
}

function CPlusPlus({ size }) {
    return (
        <svg version="1.1" height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#0277bd" d="m10 15.97.41 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96-1.12-1.27-1.68-2.88-1.68-4.83.05-2.31.72-4.08 2-5.32 1.32-1.25 2.96-1.89 4.94-1.89.75 0 1.4.07 1.94.19s.94.25 1.2.4l-.58 2.49-1.06-.34c-.4-.1-.86-.15-1.39-.15-1.16-.01-2.12.36-2.87 1.1-.76.73-1.15 1.85-1.18 3.34 0 1.36.37 2.42 1.08 3.2.71.77 1.71 1.17 2.99 1.18l1.33-.12c.43-.08.79-.19 1.1-.32m.5-4.97h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2m7 0h2v-2h2v2h2v2h-2v2h-2v-2h-2z" />
        </svg>

    )
}
function CSS({ size }) {
    return (
        <svg version="1.1" viewBox="0 0 24 24" height={size} width={size} xmlns="http://www.w3.org/2000/svg">
            <path d="m5 3l-.65 3.34h13.59l-.44 2.16h-13.58l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64h-3.34l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21 1.54-7.76h-16.94z" fill="#42a5f5" />
        </svg>
    )
}
function Python({ size }) {
    return (
        <svg version="1.1" height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-1.5418e-7 -.00046865)">
                <g>
                    <path d="m9.8594 2.0009c-1.58 0-2.8594 1.2794-2.8594 2.8594v1.6797h4.2891c.39 0 .71094.57094.71094.96094h-7.1406c-1.58 0-2.8594 1.2794-2.8594 2.8594v3.7812c0 1.58 1.2794 2.8594 2.8594 2.8594h1.1797v-2.6797c0-1.58 1.2716-2.8594 2.8516-2.8594h5.25c1.58 0 2.8594-1.2716 2.8594-2.8516v-3.75c0-1.58-1.2794-2.8594-2.8594-2.8594zm-.71875 1.6094c.4 0 .71875.12094.71875.71094s-.31875.89062-.71875.89062c-.39 0-.71094-.30062-.71094-.89062s.32094-.71094.71094-.71094z" fill="#3c78aa" />
                    <path d="m17.959 7v2.6797c0 1.58-1.2696 2.8594-2.8496 2.8594h-5.25c-1.58 0-2.8594 1.2696-2.8594 2.8496v3.75a2.86 2.86 0 0 0 2.8594 2.8613h4.2812a2.86 2.86 0 0 0 2.8594 -2.8613v-1.6797h-4.291c-.39 0-.70898-.56898-.70898-.95898h7.1406a2.86 2.86 0 0 0 2.8594 -2.8613v-3.7793a2.86 2.86 0 0 0 -2.8594 -2.8594zm-9.6387 4.5137-.0039.0039c.01198-.0024.02507-.0016.03711-.0039zm6.5391 7.2754c.39 0 .71094.30062.71094.89062a.71 .71 0 0 1 -.71094 .70898c-.4 0-.71875-.11898-.71875-.70898s.31875-.89062.71875-.89062z" fill="#fdd835" />
                </g>
            </g>
        </svg>

    )
}
export function FileIcon({ file, type, size }) {
    if (fs.existsSync("C:\\Users\\devse\\OneDrive\\Desktop\\" + file) && fs.lstatSync("C:\\Users\\devse\\OneDrive\\Desktop\\" + file).isDirectory()) {
        return <Folder size={size} />
    } else {
        if (['exe'].includes(type)) {
            return <Exe size={size} />
        } else if (['cpp'].includes(type)) {
            return <CPlusPlus size={size} />
        } else if (['py'].includes(type)) {
            return <Python size={size} />
        } else if (['css'].includes(type)) {
            return <CSS size={size} />
        } else {
            return <File size={size} />
        }
    }

}