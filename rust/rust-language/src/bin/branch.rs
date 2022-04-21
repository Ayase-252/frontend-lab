fn main() {
  let number = 3;

  if number < 5 {
      println!("condition was true");
  } else {
      println!("condition was false");
  }

  let lucky = if number == 2 { 6 } else { 7 };
  println!("lucky is {}", lucky);
}
