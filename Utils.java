public class Utils {

    // Empty constructor
    public void Utils() {}

    // Returns an array of keywords extracted from a line of keywords
    public static String[] extractKeywords(String bunchOfKeywords) {
      return bunchOfKeywords.replace("; ", "\n").split(System.getProperty("line.separator"));
    }
}
