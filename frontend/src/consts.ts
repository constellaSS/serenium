import * as process from "process";

const ADDRESS = {
  NODE: process.env.REACT_APP_NODE_ADDRESS as string,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

const AZURE = {
  BLOB_STORAGE_SAS: process.env.REACT_APP_AZURE_BLOB_STORAGE_SAS as string
};

const PROGRAMS = {
  THREAD: {
    ID: "0x8afe182ad15b1b8eeb4a59874e719eac5df57d20add14524d74bd898c926fc9a" as `0x${string}`,
    META: "0001000100000000000104000000010900000000000000010a000000451050000808696f18496e69744654000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f30546872656164416374696f6e000110244e65775468726561640400140128496e697454687265616400000024456e64546872656164000100204164645265706c791000180118537472696e670000180118537472696e670000180118537472696e670000180118537472696e67000200244c696b655265706c790800200110753132380000180118537472696e6700030000140808696f28496e697454687265616400001401086964180118537472696e6700012c7468726561645f747970651c0128546872656164547970650001147469746c65180118537472696e6700011c636f6e74656e74180118537472696e6700012470686f746f5f75726c180118537472696e6700001800000502001c0808696f2854687265616454797065000108244368616c6c656e6765000000205175657374696f6e00010000200000050700240808696f2c5468726561644576656e74000110404e6577546872656164437265617465640000002c546872656164456e646564000100285265706c794164646564000200285265706c794c696b656400030000280808696f20496f54687265616400002c01086964180118537472696e670001146f776e657204011c4163746f72496400012c7468726561645f747970651c0128546872656164547970650001147469746c65180118537472696e6700011c636f6e74656e74180118537472696e6700012470686f746f5f75726c180118537472696e6700011c7265706c6965732c01685665633c28537472696e672c205468726561645265706c79293e0001307061727469636970616e74733801505665633c284163746f7249642c2075313238293e0001347468726561645f73746174757340012c546872656164537461746500014864697374726962757465645f746f6b656e732001107531323800012467726170685f7265704401685665633c28537472696e672c205665633c537472696e673e293e00002c00000230003000000408183400340808696f2c5468726561645265706c7900001801086964180118537472696e670001146f776e657204011c4163746f7249640001147469746c65180118537472696e6700011c636f6e74656e74180118537472696e670001146c696b65732001107531323800011c7265706f727473200110753132380000380000023c003c00000408042000400808696f2c5468726561645374617465000108184163746976650000001c45787069726564000100004400000248004800000408184c004c0000021800"
  }
};

export { ADDRESS, LOCAL_STORAGE, AZURE, PROGRAMS };
