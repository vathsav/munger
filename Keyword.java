// POJO
public class Keyword {
  String name;
  int count;

  // Empty constructor
  public Keyword() {
  }

  public Keyword(String name, int count) {
    this.name = name;
    this.count = count;
  }

  // Getter functions
  public String getKeyword() {
    return this.name;
  }

  public int getCount() {
    return this.count;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCount(int count) {
    this.count = count;
  }

  public boolean equals(Object obj) {
    if (obj == this) {
        return true;
    }

    if (!(obj instanceof Keyword)) {
        return false;
    }

    Keyword keyword = (Keyword) obj;
    return this.name.equals(keyword.name);
  }
}
