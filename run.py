import subprocess

def get_first_line(filename):
  """
  This function reads the first line of a text file.

  Args:
      filename: The path to the text file.

  Returns:
      The first line of the text file, or None if there's an error.
  """
  try:
    with open(filename, 'r') as file:
      first_line = file.readline().strip()  # Remove trailing newline character
      return first_line
  except FileNotFoundError:
    print(f"Error: File '{filename}' not found.")
    return None

# Example usage
filename = "chromePath.txt"
chromePath = get_first_line(filename)

# Define the command as a list
command = [chromePath, "--auto-open-devtools-for-tabs"]
#command =["start", "chrome", "--auto-open-devtools-for-tabs"]

# Run the command using subprocess
try:
  subprocess.run(command)
except subprocess.CalledProcessError as error:
  print(f"Error opening Chrome with DevTools: {error}")
