#!/usr/bin/awk -f

function is_known_pin(pin) {
    for (i in PINS) {
        if (PINS[i] == pin) {
            return 1
        }
    }

    return 0
}

BEGIN {
    FS = ","

    getline line < "RandomNumberList"
    split(line, PINS, "\t")
}

NR == 1 {
    print $0
};

NR > 1 {
    pin = $2
    gsub(/[ \t"]/, "", pin)

    if (is_known_pin(pin)) {
        pins[i++] = pin
        count[pin]++
        latest[pin] = $0
    }
}

END {
    for (i in pins) {
        pin = pins[i]
        print latest[pin]
    }
}