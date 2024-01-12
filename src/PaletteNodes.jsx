/* eslint-disable */
export default [
    {
        name: 'Arduino Uno',
        color: 'green',
        highlighted: true,
        extras: {
            type: 'controller',
            analogPorts: 6,
            digitalPorts: 14,
        },
        outs: [
            'setup()',
            'loop()',
        ]
    },
    {
        name: 'Port',
        color: 'pink',
        extras: {
            value: '0',
            group: 'value',
            type: 'port',
            hasUsages: true,
            hasPortType: true,
            portType: 'Digital',
            returnType: 'int',
            selectableOptions: Array.from(Array(100).keys()).map(x => x.toString()),
            hasValue: true,
        },
        ins: [
            'in'
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'Function',
        extras: {
            type: 'logic',
            returnType: 'void',
            value: 'foo',
            hasUsages: true,
            // hasReturnType: true,
            hasValue: true,
        },
        color: 'grey',
        outs: [
            'body',
            // 'out',
        ],
        ins: [
            'declare',
            'in',
        ]
    },
    {
        name: 'Digital I/O',
        color: 'cyan',
        highlighted: true,
        extras: {
            type: 'built-in'
        },
        methods: [
            'void digitalWrite(int pin, int value)',
            'void pinMode(int pin, int mode)',
            'int digitalRead(int pin)',
        ]
    },
    {
        name: 'true',
        color: 'cyan',
        extras: {
            type: 'built-in-constant',
            returnType: 'int',
            hasUsages: true,
            link: 'https://www.arduino.cc/reference/en/language/variables/constants/constants/',
            description: <div><code>true</code> is often said to be defined as 1, which is correct, but true has a wider definition. Any integer which is non-zero is true, in a Boolean sense. So -1, 2 and -200 are all defined as true, too, in a Boolean sense.</div>
        },
        ins: [
            'in',
        ],
        outs: [
            'out',
        ]
    },
    {
        name: 'ArduinoAPDS_9950',
        color:'blue',
        extras:{
          type:'component',
        },
        methods:[
            'bool begin()',
            'void get_colorData(struct colorDataRaw * color)',
            'void get_proximityData(struct proximityDataRaw * proximity)',
            'Error error()'
        ]
    },
]