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
import folder from './icons/folder-dump.svg'
import audio from './icons/audio.svg'
import zip from './icons/zip.svg'
import xml from './icons/xml.svg'
import svg from './icons/svg.svg'
import image from './icons/image.svg'

export default function FileIcon({ type, cname, size }) {
    return <img className={cname} src={getIcon(type)} height={size} width={size} />
}

function getIcon(type) {
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
        return audio;
    }

    if (['exe', 'iso', 'msi'].includes(type)) return exe;

    if (['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif',
        'webp', 'tiff', 'tif', 'psd', 'raw', 'raw', 'arw', 'cr2', 'nrw',
        'k25', 'bmp', 'dib', 'heif', 'heic', 'ind', 'indd', 'indt'].includes(type)) return image;
    switch (type) {
        case 'c': return c;
        case 'cpp': return cpp;
        case 'py': return python;
        case 'css': return css;
        case 'docx': return word;
        case 'txt': return document;
        case 'pdf': return pdf;
        case 'folder': return folder;
        case 'zip': return zip;
        case 'xml': return xml;
        case 'svg': return svg;

        default: return file;
    }
}