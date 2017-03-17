import java.io.*;
import java.util.*;

public class PoliParser {
    public static void main(String args[]) throws Exception {

        Scanner keywordsScanner = new Scanner(new File("keywords.txt"));
        Scanner coursesScanner = new Scanner(new File("courses.txt"));
        List<String> keywordsList = new ArrayList<String>();
        List<String> coursesList = new ArrayList<String>();

        while (keywordsScanner.hasNextLine() && coursesScanner.hasNextLine()) {
            keywordsList.add(keywordsScanner.nextLine());
            coursesList.add(coursesScanner.nextLine());
        }

        String[][] data = new String[coursesList.size()][100];

        // Construct the 2D array
        for (int i = 0; i < coursesList.size(); i++) {
            // Find out the number of keywords in the corresponding keywords list for this index.
            String[] arrayOfKeywords = new Utils().extractKeywords(keywordsList.get(i));

            for (int j = 0; j < arrayOfKeywords.length; j++) {
                data[i][j] = arrayOfKeywords[j];
            }
        }

        // TEST: Get the 3rd keyword in the 26th thesis.
        System.out.println(data[25][2]);
        //
        // // Include the
        // List<Keyword> listOfKeywords = new ArrayList<>();
        //
        // for (int i = 0; i < arrayOfKeywords.length; i++) {
        //     int numberOfOccurrences = 0;
        //     for (int j = 0; j < arrayOfKeywords.length; j++)
        //         if (arrayOfKeywords[i].equals(arrayOfKeywords[j])) numberOfOccurrences++;
        //
        //     // BOOM BOOM BOOM
        //     Keyword keyword = new Keyword(arrayOfKeywords[i], numberOfOccurrences);
        //
        //     if (!listOfKeywords.contains(keyword))
        //         listOfKeywords.add(keyword);
        // }
        //
        // // String json = "{";
        // for (Keyword keyword: listOfKeywords) {
        //     System.out.println(keyword.name + " " + keyword.count);
        // }
        //
        // json += "}";
    }
}
