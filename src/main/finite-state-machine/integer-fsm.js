import stateMachine from "javascript-state-machine";
import { isDigit } from "../../utils/char-utils";

export const integerFsm = {
  machine: {},
  result: "",
  acceptedStates: ["A"],
  isCurrentStateAcceptState: function() {
    const result = this.acceptedStates.indexOf(this.machine.state) !== -1;
    return result;
  },
  initialize: function(input) {
    this.result = {
      parsedInput: "",
      ignoredLeadingZerosCount: 0,
      totalInputLength: 0,
      successful: false
    };
    this.input = input;
    this.machine = new stateMachine({
      init: "A",
      transitions: [
        {
          name: "step",
          from: "A",
          to: function(char) {
            if (isDigit(char)) return "A";
            return "B";
          }
        }
      ]
    });
  },
  run: function(input) {
    this.initialize(input);
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (shouldIgnoreLeadingZero(input, i, this.result.parsedInput)) {
        // console.log(`ignoring leading zero for input ${input}`);
        this.result.ignoredLeadingZerosCount++;
        continue;
      }

      if (!this.isCurrentStateAcceptState()) break;

      this.machine.step(char);

      if (this.isCurrentStateAcceptState()) {
        this.result.parsedInput += char;
      } else {
        break;
      }
    }

    if (
      this.result.ignoredLeadingZerosCount === 0 &&
      this.result.parsedInput.length !== 0
    ) {
      this.result.successful = true;
    }

    return this.result;
  }
};

export default {
  integerFsm
};

function shouldIgnoreLeadingZero(input, index, parsedInput) {
  const char = input[index];

  const result =
    char === "0" && parsedInput.length === 0 && index !== input.length - 1; // Don't ignore starting zero if this is the last character in the input

  //   console.log(
  //     `char: ${char}, input: ${input}, index: ${index}, result: ${result}`
  //   );
  return result;
}
/**
 *
 * (A) => digit => (A) (Accept state)
 * (A) => other => (B)
 *
 */

/**
  * ... which creates an object with a current state property:

    fsm.state

... methods to transition to a different state:

    fsm.melt()
    fsm.freeze()
    fsm.vaporize()
    fsm.condense()

... observer methods called automatically during the lifecycle of a transition:

    onMelt()
    onFreeze()
    onVaporize()
    onCondense()

... along with the following helper methods:

    fsm.is(s) - return true if state s is the current state
    fsm.can(t) - return true if transition t can occur from the current state
    fsm.cannot(t) - return true if transition t cannot occur from the current state
    fsm.transitions() - return list of transitions that are allowed from the current state
    fsm.allTransitions() - return list of all possible transitions
    fsm.allStates() - return list of all possible states

  */
