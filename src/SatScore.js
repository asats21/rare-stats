export const calculateSatScore = (S, M, A, F, FH) => {
    const S_max = 2.1 * Math.pow(10, 15); // 2.1 quadrillion
    const logS_max = Math.log(S_max);
    const logS = Math.log(S);
    const logM = Math.log(M);

    const AF_avg = (A + F)/2;
    const AF_avg_n = AF_avg > 1 ? AF_avg : 1;

    const Sc = (logS / logS_max);
    const AFc = Math.log(AF_avg_n) / logM;
    const Hc = (1 - (FH / F)) > 0 ? (1 - (FH / F)) : 0.01;  // Impact of holders relative to supply

    const Sci = 1 - Sc;
    const AFci = 1 - AFc;
    const Hci = 1 - Hc;

    // Calculate score using the formula
    const score = 1000 * (1 - Sc * AFc * Hc);

    // Apply power law transformation to the score
    const alpha = 1.5;
    const power_transformed_score = Math.pow(score / 1000, alpha) * 1000;

    return { score, power_transformed_score, Sc, AFc, Hc, Sci, AFci, Hci };
};