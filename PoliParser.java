import java.io.*;
import java.util.*;

public class PoliParser {
    public static void main(String args[]) throws Exception {

        String[] arrayOfKeywords = {};
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader("data.txt"))) {
            StringBuilder stringBuilder = new StringBuilder();
            String line = bufferedReader.readLine();
            while (line != null) {
                stringBuilder.append(line);
                stringBuilder.append(System.lineSeparator());
                line = bufferedReader.readLine();
            }

            String data = stringBuilder.toString();

            // arrayOfKeywords = {data};
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        List < Keyword > listOfKeywords = new ArrayList < > ();

        for (int i = 0; i < arrayOfKeywords.length; i++) {
            int numberOfOccurrences = 0;
            for (int j = 0; j < arrayOfKeywords.length; j++)
                if (arrayOfKeywords[i].equals(arrayOfKeywords[j])) numberOfOccurrences++;

            // BOOM BOOM BOOM
            Keyword keyword = new Keyword(arrayOfKeywords[i], numberOfOccurrences);

            if (!listOfKeywords.contains(keyword))
                listOfKeywords.add(keyword);
        }

        String json = "{";

        for (Keyword keyword: listOfKeywords) {
            System.out.println(keyword.name + " " + keyword.count);
        }

        json += "}";
    }
}
