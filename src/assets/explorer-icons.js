import * as React from 'react'
import file from './explorer-icons/file.svg'
import audio from './explorer-icons/audio.svg'


function AppIcon({ size }) {
    return (<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={size} height={size} viewBox="0 0 24 24">
        <path fill="var(--explorer-icon)" d="M19,4C20.11,4 21,4.9 21,6V18A2,2 0 0,1 19,20H5C3.89,20 3,19.1 3,18V6A2,2 0 0,1 5,4H19M19,18V8H5V18H19Z" />
    </svg>)
}

function FolderIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24">
            <path fill="var(--explorer-icon)" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" />
        </svg>
    )
}

function ImageIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill="var(--explorer-icon)" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
        </svg>
    )
}

function CodeIcon({ size }) {
    return (
        <svg height={size} width={size} viewBox="0 0 24 24">
            <path fill="var(--explorer-icon)" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
        </svg>
    )
}

function FileIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill="var(--explorer-icon)" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
        </svg>
    )
}

function AudioIcon({ size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" width={size}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path fill="var(--explorer-icon)" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
    )
}



export default function ExplorerIcon({ type, cname, size }) {
    return getIcon(type, size)
}

function getIcon(type, size) {
    if (
        ['3GA', '4MP', '5XB', '5XE', '5XS', '669', '8SVX', 'A2B', 'A2I',
            'A2M', 'AA', 'AA3', 'AAC', 'AAX', 'AB', 'ABC', 'ABM', 'AC3', 'ACD',
            'ACD-BAK', 'ACD-ZIP', 'ACM', 'ACP', 'ACT', 'ADG', 'ADT', 'ADTS',
            'ADV', 'AFC', 'AGM', 'AGR', 'AIF', 'AIFC', 'AIFF', 'AIMPPL', 'AKP',
            'ALC', 'ALL', 'ALS', 'AMF', 'AMR', 'AMS', 'AMS', 'AMXD', 'AMZ',
            'ANG', 'AOB', 'APE', 'APL', 'ARIA', 'ARIAX', 'ASD', 'AT3', 'AU',
            'AUD', 'AUP', 'AVASTSOUNDS', 'AY', 'B4S', 'BAND', 'BAP', 'BDD',
            'BIDULE', 'BNK', 'BRSTM', 'BUN', 'BWF', 'BWG', 'BWW', 'CAF', 'CAFF',
            'CDA', 'CDDA', 'CDLX', 'CDO', 'CDR', 'CEL', 'CFA', 'CGRP', 'CIDB',
            'CKB', 'CKF', 'CONFORM', 'COPY', 'CPR', 'CPT', 'CSH', 'CTS', 'CWB',
            'CWP', 'CWS', 'CWT', 'DCF', 'DCM', 'DCT', 'DEWF', 'DF2', 'DFC', 'DFF',
            'DIG', 'DLS', 'DM', 'DMC', 'DMF', 'DMSA', 'DMSE', 'DRA', 'DRG', 'DS',
            'DS2', 'DSF', 'DSM', 'DSS', 'DTM', 'DTS', 'DTSHD', 'DVF', 'DWD', 'EFA',
            'EFK', 'EFQ', 'EFS', 'EFV', 'EMD', 'EMP', 'EMX', 'ESPS', 'EXPRESSIONMAP',
            'EXS', 'F2R', 'F32', 'F3R', 'F4A', 'F64', 'FDP', 'FEV', 'FLAC', 'FLM',
            'FLP', 'FPA', 'FRG', 'FSB', 'FSC', 'FSM', 'FTM', 'FTM', 'FTMX', 'FZF',
            'FZV', 'G721', 'G723', 'G726', 'GBPROJ', 'GBS', 'GIG', 'GP5', 'GPBANK',
            'GPK', 'GPX', 'GROOVE', 'GSF', 'GSFLIB', 'GSM', 'H0', 'H4B', 'H5B',
            'H5E', 'H5S', 'HBE', 'HCA', 'HDP', 'HSB', 'IAA', 'ICS', 'IFF', 'IGP',
            'IGR', 'INS', 'INS', 'ISMA', 'ITI', 'ITLS', 'ITS', 'JAM', 'JSPF',
            'K26', 'KAR', 'KFN', 'KMP', 'KOZ', 'KOZ', 'KPL', 'KRZ', 'KSC',
            'KSF', 'KT3', 'L', 'LA', 'LOF', 'LOGIC', 'LOGICX', 'LSO', 'LWV',
            'M3U', 'M3U8', 'M4A', 'M4B', 'M4P', 'M4R', 'M5P', 'MA1', 'MBR',
            'MDC', 'MDR', 'MED', 'MGV', 'MID', 'MIDI', 'MINIGSF', 'MINIPSF',
            'MINIPSF2', 'MINIUSF', 'MKA', 'MMF', 'MMLP', 'MMM', 'MMP', 'MMPZ',
            'MO3', 'MOD', 'MOGG', 'MP2', 'MP3', 'MPA', 'MPC', 'MPDP', 'MPGA',
            'MPU', 'MSCX', 'MSCZ', 'MSMPL_BANK', 'MSV', 'MT2', 'MTE', 'MTF',
            'MTI', 'MTM', 'MTP', 'MTS', 'MUI', 'MUS', 'MUS', 'MUSX', 'MUX',
            'MUX', 'MX3', 'MX4', 'MX5', 'MX5TEMPLATE', 'MXL', 'MXMF', 'MYR',
            'NARRATIVE', 'NBS', 'NCW', 'NKB', 'NKC', 'NKI', 'NKM', 'NKS', 'NKX',
            'NML', 'NMSV', 'NOTE', 'NPL', 'NRA', 'NRT', 'NSA', 'NSFE', 'NTN',
            'NVF', 'NWC', 'OBW', 'ODM', 'OFR', 'OGA', 'OGG', 'OKT', 'OMA', 'OMF',
            'OMG', 'OMX', 'OPUS', 'OTS', 'OVE', 'OVW', 'OVW', 'PAC', 'PANDORA',
            'PBF', 'PCA', 'PCAST', 'PCG', 'PEAK', 'PEK', 'PHO', 'PHY', 'PK',
            'PKF', 'PLA', 'PLY', 'PNA', 'PNO', 'PPC', 'PPCX', 'PRG', 'PSF',
            'PSF1', 'PSF2', 'PSM', 'PSY', 'PTCOP', 'PTF', 'PTM', 'PTS', 'PTT',
            'PTX', 'PTXT', 'PVC', 'Q1', 'QCP', 'R1M', 'RA', 'RAM', 'RAW',
            'RAX', 'RBS', 'RBS', 'RCY', 'REX', 'RFL', 'RGRP', 'RIP', 'RMI',
            'RMJ', 'RMX', 'RNG', 'RNS', 'ROL', 'RSN', 'RSO', 'RTA', 'RTI',
            'RTS', 'RVX', 'RX2', 'S3I', 'S3M', 'S3Z', 'SAF', 'SAP', 'SBG',
            'SBI', 'SBK', 'SC2', 'SCS11', 'SD', 'SD', 'SD2', 'SD2F', 'SDAT',
            'SDS', 'SDT', 'SEQ', 'SES', 'SESX', 'SF2', 'SFAP0', 'SFK', 'SFL',
            'SFPACK', 'SFS', 'SFZ', 'SGP', 'SHN', 'SIB', 'SLP', 'SLX', 'SMA', 'SMF',
            'SMP', 'SMP', 'SMPX', 'SND', 'SND', 'SND', 'SNG', 'SNG', 'SNGX', 'SNS',
            'SONG', 'SOU', 'SPH', 'SPPACK', 'SPRG', 'SSEQ', 'SSEQ', 'SSM', 'SSND',
            'STAP', 'STM', 'STX', 'STY', 'SVD', 'SVX', 'SWA', 'SXT', 'SYH', 'SYN',
            'SYW', 'SYX', 'TAK', 'TAK', 'TD0', 'TG', 'TOC', 'TRAK', 'TTA', 'TXW',
            'U', 'UAX', 'ULT', 'UNI', 'USF', 'USFLIB', 'UST', 'UW', 'UWF', 'VAG',
            'VAP', 'VB', 'VC3', 'VDJ', 'VGM', 'VGZ', 'VIP', 'VLC', 'VMD', 'VMF',
            'VMF', 'VMO', 'VOC', 'VOX', 'VOXAL', 'VPL', 'VPM', 'VPR', 'VPW',
            'VQF', 'VRF', 'VSQ', 'VSQX', 'VTX', 'VYF', 'W01', 'W64', 'WAV',
            'WAVE', 'WAX', 'WEM', 'WFB', 'WFD', 'WFM', 'WFP', 'WMA', 'WOW', 'WPK',
            'WPP', 'WPROJ', 'WRK', 'WTPL', 'WTPT', 'WUS', 'WUT', 'WV', 'WVC',
            'WVE', 'WWU', 'XA', 'XFS', 'XM', 'XMF', 'XMU', 'XRNS', 'XSP',
            'XSPF', 'YOOKOO', 'ZPA', 'ZPL', 'ZVD'].includes(type)) {
        return <AudioIcon size={size} />;
    }

    else if (['exe', 'iso', 'msi'].includes(type)) return <AppIcon size={size} />;

    else if (['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif',
        'webp', 'tiff', 'tif', 'psd', 'raw', 'raw', 'arw', 'cr2', 'nrw',
        'k25', 'bmp', 'dib', 'heif', 'heic', 'ind', 'indd', 'indt'].includes(type)) return <ImageIcon size={size} />;
    else if (type === 'folder') {
        return <FolderIcon size={size} />
    } else if (['cpp', 'c', 'py', 'js', 'html', 'js', 'jar', 'apk'].includes(type)) {
        return <CodeIcon size={size} />
    } else {
        return <FileIcon size={size} />
    }
}